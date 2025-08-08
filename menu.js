class Menu {
    #items = [];
    tagKey;
    constructor(){
        for(let i in window.webpackRequire.m){
            let mod = window.webpackRequire(i);
            if(!mod?.A?.menuItemButton) continue;
            this.tagKey = mod.A;
            break;
        }
        return this;
    }

    addItem = (item) => {
        item.parentMenu = this;
        this.#items.push(item);
    }

    getElement = () => {
        let element = document.createElement('ul');//
        element.className = this.tagKey.menu;

        this.#items.forEach((item) => {
            let itemElement = item.getElement();
            element.appendChild(itemElement);
        });
        
        return element;
        /* ul menu
            > li menuItem
                > button menuItemButton
                    > div menuItemLabel
                        > svg e-91000-icon e-91000-baseline
                        > span ellipsis-one-line
        */
    }
}


class MenuItem {
    type;
    textContent;
    onClick;
    parentMenu;

    constructor(type){
        this.type = type;
    }

    getElement = () => {
        let element = document.createElement('li');
        element.className = this.parentMenu.tagKey.menuItem;
        element.setAttribute('role','presentation');

        if(this.type == 'button') element.appendChild(this.#generateButtonElement());
        else if(this.type == 'divider') element.className = this.parentMenu.tagKey.dividerBefore;
        

        return element;
    }
    
    #generateButtonElement = () => {
        let buttonElement = document.createElement('button');
        buttonElement.onClick = this.onClick;
        buttonElement.className = this.parentMenu.tagKey.menuItemButton;
        buttonElement.setAttribute('role','menuItem');

        let label = document.createElement('div');
        label.className = this.parentMenu.tagKey.menuItemLabel;

        let subText = document.createElement('span');
        subText.className = 'ellipsis-one-line';
        subText.textContent = this.textContent;

        label.appendChild(subText);
        buttonElement.appendChild(label);

        return buttonElement;
    }
}