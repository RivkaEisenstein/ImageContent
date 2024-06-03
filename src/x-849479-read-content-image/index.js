import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import  Tesseract from 'tesseract.js';
import { FilePond, registerPlugin } from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImagePreview);

	// Logs the output object to Update Progress, which
	// checks for Tesseract JS status & Updates the progress
	




const view = (state, {updateState}) => {
	

	//worker.load();
	function changeFunction(event){
		console.log("riuvka"+event.target.files[0]);
		var file = event.target.files[0];
		file = URL.createObjectURL(new Blob([file]));
		updateState({ocrText:file})
		Tesseract.recognize(
			file,'eng',
			{ 
			  logger: m => console.log("rivkabrinegr"+m) 
			}
		  )
		  .catch (err => {
			console.error("error"+err);
		  })
		  .then(result => {
			// Get Confidence score
			let confidence = result.confidence
		   
			let text = result.text
			console.log("rivkatext"+text);
			updateState({imageText:text});
		
		  })
	}
	
  
	return (
		<div className="App">
			<br/>
			<br/>
		<div className="container">
		<body>
        <label for="input_image">Choose an Image File:</label>
        <input type="file"  on-input={ (e)=>{updateState({ocrText:e.target.value});console.log(e.target.value)}} on-change={e=> changeFunction(e)}/>
        <br />
        <br />
        <textarea id="image-text" value={state.imageText}></textarea>
		<br/><br/> 
		<progress id="progressbar" min="0" max="1" value="0"/>
    </body>
			</div>

		</div>
	);
};

createCustomElement('x-849479-read-content-image', {
	renderer: {type: snabbdom},
	initialState: {
        imageText:'',
		isProcessing : false,
		ocrText : '',
		pctg : '0.00'
	  
	  },
	 
	view,
	styles
});
