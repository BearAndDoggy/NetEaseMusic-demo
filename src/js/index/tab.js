{
    let view = {
        el:"#tabs",
        render(){

        }
    }

    let model = {}

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render()
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).on('click', 'li', (e)=>{
                let $li = $(e.currentTarget)
                let tabName = $li.attr('data-tab-name')
                $li.addClass('active').siblings().removeClass('active')
                window.eventHub.emit('selected', tabName)
            })
        } 
    }
    controller.init(view, model)
}