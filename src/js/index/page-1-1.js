{
    let view = {
        el: '.playList',
        template: `
        <a href="./playlistSong.html?id=__id__">
            <li>
                <img src="__cover__" alt="">
                <p>__name__</p>
            </li>
        </a>`,
        render(data){
            let {playLists} = data         
            playLists.map((playList)=>{
                let arr = ['cover', 'name', 'id']
                let html = this.template
                arr.map((value)=>{
                    html = html.replace(`__${value}__`, playList[value] || '')                                     
                })
                $(this.el).append(html) 
            })

            
        }

    }

    let model = {
        data: {
            playLists: []
        },
        fetchAll(){
            var query = new AV.Query('Playlist')
            return query.find().then((songs)=>{
              songs.forEach((song)=>{
                this.data.playLists.push({id: song.id, ...song.attributes})
              })
              return songs
            })
        }
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEvents()
            this.setAll()
        },
        setAll(){
            this.model.fetchAll().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
             
        }
    }

    controller.init(view, model)

}