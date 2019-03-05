{
    let view = {
        el: '#page-2',
        template: `             
        <a href="./song.html?id={{id}}">
            <div class="rank">{{rank}}</div>
            <li>
                <h3>{{name}}</h3>
                <p>{{singer}}</p>
            </li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
        </a>`,
        render(data){
            let {songs} = data
            songs.map((song)=>{
                if (song.dependent === undefined) {
                    let html = this.template
                    let arr = ['name', 'singer', 'id']
                    arr.map((re)=>{
                        html = html.replace(`{{${re}}}`, song[re] || '')
                    })         
                    $(this.el).find('.songsList').append(html)
                }
            })

            $(this.el).find('.songsList a').each((index, element)=>{
                let html = $(element).html().replace('{{rank}}', `0${index + 1}`)
                $(element).html(html)
            })

            $(this.el).find('#tab2Loading').removeClass('active')
            
        },
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }

    let model = {
        data: {
            songs:[]
        },
        fetchALL(){
            var query = new AV.Query('Song')
            return query.find().then((songs)=>{
              songs.forEach((song)=>{
                this.data.songs.push({id: song.id, ...song.attributes})
              })
              return this.data.songs
            })
        }
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.getALL()
            this.bindEventHub()
        },
        getALL(){
            this.model.fetchALL().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEventHub(){
            window.eventHub.on('selected', (tabName)=>{
                if (tabName === 'page-2') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view, model)
}