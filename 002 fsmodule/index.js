const fs = require('fs')
const path = require('path')

const filepath =  path.join(__dirname,'files') /////file path teyar krna 

fs.writeFileSync(`${filepath}/index.html`,'jai shree ram')
fs.writeFileSync(`${filepath}/index.txt`,'jai shree ram')


fs.readFile(`${filepath}/index.html`, 'utf-8' , (error, data)=>{/////  (utf-8= website main text ka correct display ensure krne kie liye) file ke contant ko read krne ke liye
    if(error) return console.log(error)

        console.log(data)
})

fs.appendFile(`${filepath}/index.html`, ', unke chele bajrang bali', ()=>{////fiel ke ander koi alg se kisi contant ko apend ya add krna
    console.log('file updated')
})

fs.unlinkSync(`${filepath}/index.txt`)////file ko dele krna
