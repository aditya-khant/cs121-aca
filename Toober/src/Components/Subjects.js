import React from 'react';
import { MenuItem} from '@material-ui/core';

// List of all of the subjects we want in the program
export const Subjects = ["Math", "English", "Biology", "Physics", "Chemistry"]

export function createSelectItems(type) {
    let items = [];
    for (let i = 0; i < Subjects.length; i++) {
        // renders the subjects as appropriate
        if (type === "option") {
            items.push(<option key = {i} value = {Subjects[i]}>{Subjects[i]}</option>)
        }
        if (type === "menuItem") {
            items.push(<MenuItem value={Subjects[i]}>{Subjects[i]}</MenuItem>)
        }

    }
    return items;
}
