import {basicSetup, EditorView} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import {html} from "@codemirror/lang-html"
import { oneDarkTheme } from "@codemirror/theme-one-dark";


const jscode=`function checkStringsAnagram(a, b) {
    let len1 = a.length;
    let len2 = b.length;
    if(len1 !== len2){
       console.log('Invalid Input');
       return
    }
    let str1 = a.split('').sort().join('');
    let str2 = b.split('').sort().join('');
    if(str1 === str2){
       console.log("True");
    } else { 
       console.log("False");
    }
 }
 checkStringsAnagram("racecar","carrace")
 
 
 `;
const myTheme = EditorView.baseTheme({
  "&.cm-editor": {
    fontSize: '16px',
  },
  ".cm-scroller": {
    fontFamily:'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace'
  },
}, {dark: true})

let timer;

const evaluateCode = (code) => {
  console.clear();
  try{
    Function(code)(window);
  }
  catch(err) {
    console.error(err);
  }
}


new EditorView({
  doc: jscode,
  extensions: [basicSetup, javascript(),
    myTheme,
    oneDarkTheme,
    EditorView.updateListener.of((v)=> {
      if(v.docChanged) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          evaluateCode(editor.state.doc.toString())
        }, 500 );
      }
    })],
  parent: document.querySelector("#editor")
})

