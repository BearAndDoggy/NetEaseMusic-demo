{
    let view = {
        el: '.lastestMusic',
        template: `             
        <li>
            <a href="./song.html?id=__id__">
                <h3>__name__</h3>
                <p>__singer__-__name__</p>           
                <svg class="play" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
            </a>
        </li>`,
        render(data){
            data.map((song)=>{
                if (song.dependent === undefined) {
                    let html = this.template
                    let arr = ['name', 'url', 'singer', 'id']
                    arr.map((re)=>{
                        html = html.replace(`__${re}__`, song[re] || '')
                        html = html.replace(`__${re}__`, song[re] || '')
                    })         
                    $(this.el).find('#lastestMusic').append(html)
                    $(this.el).find('.loading').addClass('complete')
                }
            })
        }

    }

    let model = {
        data: {
            songs: []
        },

        fetch(){
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
            this.model.fetch().then((songs)=>{
                this.view.render(songs)
            })
            this.bindEvents()
        },
        bindEvents(){

        }
    }

    controller.init(view, model)
}