// ### 4 things should be done:
// 1. tab bar switch
// 2. click add button to add a new list and section
// 3. click the close on every list to delete this list and the corresponding section
// 4. lists and the corresponding section content can be edited
var that;
class Tab {
    constructor(id) {
            that = this;
            // console.log(that);
            // that is Tab

            // console.log('this in the constructor is: ', this);
            // this is Tab
            // get elements
            this.main = document.querySelector(id);

            this.navBar = this.main.querySelector('.tabbar');

            this.ulInNavBar = this.main.querySelector('.tabbar ul');

            this.addListItem = this.main.querySelector('.add-list');

            this.tabContent = this.main.querySelector('.tab-content');

            this.init();
        }
        // ### bind events on elements
    init() {
        // console.log('this in init function is: ', this);
        // this is Tab

        this.updateNodes();

        // bind click event on click button
        this.addListItem.onclick = this.tabAdd;

        // bind click event on every list item to switch among list items. Since there are more than on list item, use loop.
        for (var i = 0; i < this.tabListItems.length; i++) {
            this.tabListItems[i].index = i;

            this.tabListItems[i].onclick = this.tabToggle;

            // bind click event on every delete button
            this.deleteTabListItem[i].onclick = this.tabDelete;

            // bind double click event on every list item and the corresponding section to edit content
            this.tabSpanInLis[i].ondblclick = this.tabEdit;

            this.tabContentSections[i].ondblclick = this.tabEdit;
        }
    }

    // ### update data after every operations or refresh(dynamic elements)
    updateNodes() {
        // console.log('this in updateNodes is: ', this);
        // this is Tab

        this.tabListItems = this.main.querySelectorAll('.tabbar ul li');

        this.tabSpanInLis = this.main.querySelectorAll('.tabbar ul li span:first-child');

        this.deleteTabListItem = this.main.querySelectorAll('.tabbar ul li .iconfont');

        this.tabContentSections = this.main.querySelectorAll('.tab-content section');
    }

    tabToggle() {
        // console.log('this in tabToggle function is: ', this);
        // this is the corresponding li element


        that.clearClass();
        // ### 2 things should be done:
        // 1. switch tab list item, the corresponding border-bottom should be none. In other way, add a class name-->li-active on this li element(styles are set in css).
        this.className = 'li-active';
        // console.log(this.index);

        // 2. the corresponding content section should appear, other content sections should disappear. In other way, add a class name-->content-active on this section element(styles are set in css).
        that.tabContentSections[this.index].className = 'content-active';

    }


    // in order to make sure class="li-active" or class="content-active" only assigned on the chosen elements, we should clear class="li-active" or class="content-active" from all elements.
    clearClass() {
        // console.log('this in clearClass function is: ', this);
        // this is Tab

        for (var i = 0; i < this.tabListItems.length; i++) {
            this.tabListItems[i].className = '';
            this.tabContentSections[i].className = '';
        }
        this.init();
    }

    tabAdd() {
        // console.log('this in tabAdd function is: ', this);
        // this is the add button div
        var randomTest = Math.random();
        var li = '<li><span>New tab</span><span class="iconfont icon-close"></span></li>';

        var section = '<section>' + randomTest + '</section>';

        // console.log(that.ulInNavBar);
        that.ulInNavBar.insertAdjacentHTML('beforeend', li);

        that.tabContent.insertAdjacentHTML('beforeend', section);

        that.init();
    }

    tabDelete(e) {
        // console.log('this in tabDelete function is: ', this);
        // this is the close span
        e.stopPropagation();
        // console.log(this.parentNode.index);

        // console.log(this.parentNode)
        // result is li element
        this.parentNode.remove();
        var index = this.parentNode.index;
        that.tabContentSections[index].remove();
        // console.log(index);

        if (this.parentNode.className === 'li-active' && index === 0) {
            // console.log(that.ulInNavBar.children[0]);
            that.ulInNavBar.children[0].click();
        } else if (this.parentNode.className === 'li-active' && index > 0) {
            index--;
            that.ulInNavBar.children[index].click();
        }

        that.init();

    }
    tabEdit() {
        // console.log('this in tabEdit function is: ', this);
        // result is span in li element or the corresponding section
        // console.log(this.innerHTML);

        var content = this.innerHTML;

        // disable selected text when double click
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        this.innerHTML = '<input type="text">';
        var input = this.children[0];
        input.value = content;
        input.select();
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }

        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }

    }
}

new Tab('#tab');