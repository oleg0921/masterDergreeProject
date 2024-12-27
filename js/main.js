import {loadSection} from './sections.js';
import { addButtonEventListeners } from './buttons.js';

/**
 exel file with educational load
 */
export let educationalLoad = null;
export let listOfPriorities = null;

document.addEventListener('DOMContentLoaded', () => {
    addButtonEventListeners();
    loadSection('project')
});


export function setEducationalLoad(file) {
    if (file instanceof File) {
        const allowedExtensions = ['json', 'xlsx'];
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.split('.').pop();

        if (allowedExtensions.includes(fileExtension)) {
            educationalLoad = file;
            console.log(`educationalLoad установлен: ${file.name}`);
        } else {
            console.error('Ошибка: допустимы только файлы формата .json и .xlsx');
        }
    } else {
        console.error('Ошибка: educationalLoad должен быть объектом типа File');
    }
}

export function getEducationalLoad() {
    return educationalLoad;
}

export function setListOfPriorities(file) {
    if (file instanceof File) {
        const allowedExtensions = ['json'];
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.split('.').pop();

        if (allowedExtensions.includes(fileExtension)) {
            listOfPriorities = file;
            console.log(`listOfPriorities установлен: ${file.name}`);
        } else {
            console.error('Ошибка: допустимы только файлы формата .json');
        }
    } else {
        console.error('Ошибка: listOfPriorities должен быть объектом типа File');
    }
}

export function getListOfPriorities() {
    return listOfPriorities;
}