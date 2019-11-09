import firebase from 'firebase';

export async function retrieve(category, id, key){
    // Retrieves the value of a specific key of an id in a category
    const ref = firebase.database().ref(category+'/'+id);
    let out;
    ref.on('value', (snapshot) => {
        let val = snapshot.val();
        out = val[key];
    })
    return out;
}

export async function retrieveMultiple(category, id, keys){
    // Retrieves the value of multiple keys of an id in a category
    const ref = firebase.database().ref(category+'/'+id);
    let out = {};
    ref.on('value', (snapshot) => {
        let val = snapshot.val();
        for (let key of keys){
            out[key] = val[key]
        }
    })
    return out;
}

export function cleanupText(text){
    //Removes white space non alphanumeric chars and newlines from text
    return text.replace(/[\W_]+/g,"");
}

export function isNullEmptyUndef(value){
    return value === undefined || value === "" || value === [] || value ==={} || value === null;
}
