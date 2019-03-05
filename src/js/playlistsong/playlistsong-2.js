{
    let view = {
        el: '.page',
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
            </a>
        `,
        render(data){
            let {songs, id} = data
            songs.map((song)=>{
                if (song.dependent !== undefined) {
                    if (song.dependent.id === id) {
                    let html = this.template
                    let arr = ['name', 'singer', 'id']
                    arr.map((value)=>{              
                        html = html.replace(`{{${value}}}`, song[value])
                    })
    
                    $(this.el).find('.songslist').append(html)
                    } 
                }

            })
            
            $(this.el).find('.songslist a').each((index, element)=>{
                let html = $(element).html().replace('{{rank}}', index + 1)
                $(element).html(html)
            })
        }
    }

    let model = {
        data:{
            songs:[],
            id: '',
        },
        fetchSongs(){
            var query = new AV.Query('Song')
            return query.find().then((songs)=>{
                songs.forEach((song)=>{
                this.data.songs.push({id: song.id, ...song.attributes})
              })
              return songs
            })
        },
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.getId()
            this.getAll()
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
            this.model.data.id = id[0]
        },
        getAll(){
            this.model.fetchSongs().then(()=>{
                this.view.render(this.model.data)
            })
            
        },
        bindEvents(){

        }
    }

    controller.init(view, model)
}