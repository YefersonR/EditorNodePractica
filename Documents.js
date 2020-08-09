const fs = require('fs');

class Documents{
    constructor(dir){
        this.content = '';
        this.saved = false;
        this.filename = '';
        this.dir = dir;
    };
    exists(name){
        return fs.existsSync(`${this.dir}/${name}`)
    };
    append(text){
        this.content += `\n${text}`
        this.saved = false;

    };
    saveAs(name){
        fs.writeFileSync(`${this.dir}\\${name}`,this.content);
        this.saved = true;
        this.filename = name
    };
    save(){
        fs.writeFileSync(`${this.dir}\\${this.filename}`,this.content);
        this.saved = true;
        this.filename = this.filename;
    };
    getContent(){
        return this.content;
    };
    hasFileName(){
       if(this.filename  != ''){
           return true;
       }else{
           return false;
       }
    };
    getFileName(){
        return this.filename;
    };

    isSaved(){
        return this.saved;
    };

    open(name){
        this.content = fs.readFileSync(`${this.dir}\\${name}`,'UTF-8')
        this.filename = name;
        this.saved = true;
        return this.content;
    };

};

module.exports = Documents;