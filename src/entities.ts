export class message{

    private type:String
    private msg:object
    private date:String

    constructor(type:String,msg:object){
        this.type=type
        this.msg=msg
        this.date=new Date().toDateString()
    }
    public toString(){
        let p={
            'type':this.type,
            'msg':this.msg,
            'date':this.date
        }
        return JSON.stringify(p)
    }

}