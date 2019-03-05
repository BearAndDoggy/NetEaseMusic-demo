{
    let view = {
        el: '#page-1',
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
            this.bindEventHub()
            this.loadModules1()
            this.loadModules2()
        },
        bindEventHub(){
            window.eventHub.on('selected', (tabName)=>{
                if (tabName === 'page-1') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        },
        loadModules1(){
            $('<script src="./js/index/page-1-1.js">').appendTo('body')
        },
        loadModules2(){
            $('<script src="./js/index/page-1-2.js">').appendTo('body')
        }
    }
    controller.init(view, model)
}