{
    let view = {
        el: '#mp3',
        template: '',
        render(data){
            let {song} = data
            $(this.el).find('.background').css('background-image', `url(${song.cover})`)
            $(this.el).find('.cover-image').attr('src', song.cover)
            $(this.el).find('audio').attr('src', song.url)
            $(this.el).find('.lyric > h2').text(song.name)
            let {lyric} = data.song
            let rows = lyric.split('\n')
            rows.map((row)=>{
                let time = row.split(']')[0].substring(1)
                TimeArr = time.split(':')
                time = parseInt(TimeArr[0], 10) * 60 + parseFloat(TimeArr[1])
                let newLyric = row.split(']')[1]
                $(this.el).find('.lyric .hideLyric').append(`<p data-time=${time}>${newLyric}</p>`)
            })

            $(this.el).find('.loading').removeClass('active')
            
        },
        showLyric(time){
            let allP = $(this.el).find('.hideLyric > p')
            let pHeight
            let height
            for (let index = 0; index < allP.length; index++) {
                let currentTime = allP.eq(index).attr('data-time')
                let nextTime = allP.eq(index + 1).attr('data-time')
                if (index === allP.length - 1) {
                    nextTime = currentTime
                    break
                } else {
                    if(currentTime <= time && time <= nextTime){            
                        pHeight = allP[index]
                        allP.eq(index).addClass('playing').siblings().removeClass('playing')
                        break
                    }
                }
            }
            let wrapHeight = $(this.el).find('.hideLyric')[0].getBoundingClientRect().top
            if (pHeight) {
                pHeight = pHeight.getBoundingClientRect().top
                height = pHeight - wrapHeight
                $(this.el).find('.hideLyric').css('transform', `translateY(${-height}px)`) 
            }       
        },
        play(){
            let arr = ['.cover-image', '.slide-image', 'svg.play']
            arr.map((target)=>{
                $(this.el).find(target).addClass('playing')
            })
            $(this.el).find('audio')[0].play()
        },
        pause(){
            let arr = ['.cover-image', '.slide-image', 'svg.play']
            arr.map((target)=>{
                $(this.el).find(target).removeClass('playing')
            })
            $(this.el).find('audio')[0].pause()
        },
    }

    let model = {
        data: {
            song: {
                name: '',
                singer: '',
                id: '',
                url: '',
                cover: '',
                lyric: ''
            },
            status: 'pausing'
        },
        setId(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(this.data.song, {
                    id: song.id,
                    ...song.attributes
                })
            }, (error) => {});
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.setId(id).then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).find('.clickPlay').on('click', (e)=>{
                if (this.model.data.status === 'playing') {
                    this.model.data.status = 'pausing'
                    this.view.pause()
                } else if(this.model.data.status === 'pausing') {
                    this.model.data.status = 'playing'
                    this.view.play()
                }
                
            })
            let audio = $(this.view.el).find('audio')
            audio.on('ended', ()=>{
                this.model.data.status = 'pausing'
                this.view.pause()
            })

            audio.on('timeupdate', ()=>{
                let time = audio[0].currentTime
                this.view.showLyric(time)
            })
        },
        getSongId() {
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }

            let arr = search.split('&').filter(v => v)
            let id = ''
            arr.map((query) => {
                let arr = query.split('=')
                let key = arr[0]
                let value = arr[1]
                if (key === 'id') {
                    id = value
                    return
                }
            })
            return id
        }
    }
    controller.init(view, model)
}