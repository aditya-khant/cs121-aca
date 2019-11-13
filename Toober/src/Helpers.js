import firebase from 'firebase';

export async function retrieve(category, id, key){
    // Retrieves the value of a specific key of an id in a category
    try {
        const ref = firebase.database().ref(category+'/'+id);
        const snapshot = await ref.once('value');
        const val = snapshot.val();
        const out = val[key];
        return out;
    } catch {
        return null;
    }
    
}

export async function retrieveMultiple(category, id, keys){
    // Retrieves the value of multiple keys of an id in a category
    try{
        const ref = firebase.database().ref(category+'/'+id);
        let out = {};
        let snapshot = await ref.once('value');
        let val = snapshot.val();
        for (let key of keys){
            out[key] = val[key]
        }
        return out;
    } catch {
        return null;
    }
    
}

export function cleanupText(text){
    //Removes white space non alphanumeric chars and newlines from text
    return text.replace(/[\W_]+/g,"");
}

export function isNullEmptyUndef(value){
    return value === undefined || value === "" || value === [] || value ==={} || value === null;
}
