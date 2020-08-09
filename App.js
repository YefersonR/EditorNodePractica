const { read } = require("fs")

const readline = require('readline');
const Messages = require('./Messages');
const Directory = require('./Directory');
const Documents = require('./Documents');
const messages = require("./Messages");

const dir = new Directory();

const interface = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const commads = `Comandos: :q = salir,:sa = guardar como, :s = guardar
=====================================================`

const screen = `
                            ===================
                            Editor de texto.\n
                            ===================
                            Elige una opcion.\n
                            1.Crear nuevo documento.\n
                            2.Abrir documento.\n
                            3.Cerrar editor.
                            `

mainScreen();

function mainScreen(){
   process.stdout.write('\033c');

    interface.question(screen, res =>{
        switch(res.trim()){
            case '1':
                createFile();
            break;
            case '2':
                openFile();
            break;
            case '3':
                interface.close();
            break;
            default:
                mainScreen();        
        }
    })
}

function createFile(){
    const file = new Documents(dir.getPath())
    renderInterface(file);
    readCommands(file);
}

function renderInterface(file,message){
    process.stdout.write('\033c');
    (file.getFileName() == '')?console.log('|Untitled|'):console.log(`${file.getFileName()}`);
    console.log(commads);
    if(message != null){
        console.log(message);
    }
    console.log(file.getContent());
}

function readCommands(file){
    interface.on('line',input=>{
        switch(input.trim()){
            case ':q':
                interface.removeAllListeners('line');
                mainScreen();
            break;
            case ':sa':
                saveAs(file);
            break;
            case ':s':
                save(file);
            break;
            default:
                file.append(input)
        } 
    })
}
function saveAs(file){
    interface.question(messages.requestFileName,(name)=>{
        if(file.exists(name)){
            console.log(Messages.fileExists);
            interface.question(messages.replaceFileName,(confirm)=>{
                if(confirm == 'y' || confirm =='Y'){
                    file.saveAs(name);
                    renderInterface(file,messages.fileSaved + '\n');
                }else{
                    renderInterface(file,messages.fileNoSaved + '\n');
                }
            })
        }else{
            file.saveAs(name);
            renderInterface(file,messages.fileSaved + '\n');
        }
    })
}
function save(file){
    if(file.hasFileName()){
        file.save();
        renderInterface(file,messages.fileSaved + '\n');
    }else{
        saveAs(file);
    }
}
function openFile(){
    let file = new Documents(dir.getPath());
    dir.getFilesInDir();
    interface.question(messages.requestFileName,(name)=>{
        if(file.exists(name)){
            open(file,name);
        }else{
            console.log(messages.fileNoFound);
            setTimeout(()=>{interface.removeAllListeners('line');
            mainScreen();
        },2000)
        }
    })
}
function open(file,name){
    file.open(name);

    renderInterface(file);
    readCommands(file);
}