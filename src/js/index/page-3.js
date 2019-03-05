{
    let view = {
        el: '#page-3',
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }

    let model = {

    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents(){
            $(this.view.el).on('click', ()=>{
                alert('搜索功能上线中~')
            })
        },
        bindEventHub(){
            window.eventHub.on('selected', (tabName)=>{
                if (tabName === 'page-3') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view, model)
}