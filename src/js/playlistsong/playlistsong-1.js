{
    let view = {
        el: '.page',
        template: `
            <div class="playlistName-wrap">
                <div class='background-blur'></div>
                <img src="__cover__" alt="">
                <span class="ls-icon">歌单</span>
                <h2 class="playlistName">__name__</h2>            
            </div>
            <div class="introduce-wrap">
                <p class="introduce">简介：__introduce__</p>
            </div>
        `,
        render(data){
            let {playlist} = data
            let html = this.template
            let arr = ['name', 'introduce', 'cover']
            arr.map((value)=>{
                html = html.replace(`__${value}__`, playlist[value])
                
            })
            console.log($(this.el).find('.playlistName-wrap'));        
            $(this.el).prepend(html)
            $(this.el).find('.background-blur').css('background-image', `url(${playlist.cover})`)
        }
    }

    let model = {
        data:{
            playlist: {}
        },
        setId(id) {
            var query = new AV.Query('Playlist');
            return query.get(id).then((playlist) => {
                Object.assign(this.data.playlist, {
                    id: playlist.id,
                    ...playlist.attributes
                })
            }, (error) => {});
        }
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.getPlaylist()
            this.bindEvents()
        },
        getId(){
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }
            let arr = search.split('&').filter(v=>v)
            let id = arr.map((value)=>{
                let query = value.split('=')
                let key = query[0]
                let answer = query[1]
                if (key === 'id') {
                    return answer
                }
            })

            return id
        },
        getPlaylist(){
            let id = this.getId()
            this.model.setId(id).then(()=>{
               this.view.render(this.model.data)
            })
        },
        bindEvents(){

        }
    }

    controller.init(view, model)
}