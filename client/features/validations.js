export const validate = (name, value) => {
    let error = String(value).replace(/\s+/g, "").length == 0 ?
        'Заповніть поле' : rules[name](value);
    return error;
};


var rules = {
    name: value => {
        let error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть ім'я";
        return error;
    },
    email: value => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/;
        //Пропускаем до 15 символов a-z0-9_- перед собачкой, 
        //также это может быть до 4 слов, разделенных точками.
        //Затем собачка и имя домена (от 1 до 15 символов).
        //Затем доменная зона - от 2 до 6 латинских букв
        let error = regexp.test(value) ? '' : 'Введіть коректний email';
        return error;
    },
    photo: value => {
        let regexp = (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i);
        let error = regexp.test(value) ? '' : 'Введіть дійсний URL';
        return error;
    },
    complexity: value => {
        let error = value.search(/\d/) == -1 ?
            'Пароль має містити хоча б 1 цифру' :
            value.length <= 6 ?
            'Пароль має містити хоча б 6 символів' : '';
        return error;
    },
    title: value => {
        let error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть назву";
        return error;
    },
    
    compare: value => {
        let error = value[0] == value[1] ? '' : "Паролі відрізняються";
        return error;
    },
    content: value => {
        let error = (value.length <= 200 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть назву";
        return error;
    },
    startAge: value => {
        let error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть назву";
        return error;
    },
    endAge: value => {
        let error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть назву";
        return error;
    },
    age: value => {
        let error = new Date(value) == 'Invalid Date' ? "Некоректна дата народження": '';
        return error;
    },
    gender: value => (value < 3 && value > -1) ? '' : 'Некоректний вибір'
}