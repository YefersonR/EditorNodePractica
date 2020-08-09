const fs = require('fs');
const path = require('path');
const { delimiter } = require('path');

class Directory{
    constructor(){
        this.dir = 'documents';
        this.path = __dirname;
        this.createDocsDir();
    };
    createDocsDir(){
        this.path = path.join(this.path,this.dir);
        
        if(!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir)
        }
    };
    getPath(){
        return this.path
    };
    getShortPath(){
        const paths = path.parse(this.path)
        let delimiter = '/'
        if(paths.dir.indexOf()<0){
            delimiter = '\\'
        } 

        return `${paths.root}${delimiter}${paths.name}`
    };
    getFilesInDir(){
        const files = fs.readdirSync(this.path)
        console.log(`
====================================
Ubicacion: ${this.getShortPath()}
====================================`);
    
        files.forEach(file => {
           console.log(`${file}`)
        });
    };
};

module.exports = Directory;