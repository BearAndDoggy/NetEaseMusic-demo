window.eventHub = {
    events: {},
    emit(eventName, data){
        for (const key in this.events) {
            if (key === eventName) {
                let fnList = this.events[key]
                fnList.map((x)=>{
                    x.call(undefined, data)
                })
            }
        }
    },

    on(eventName, fn){
        if (this.events[eventName] === undefined) {
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }
}