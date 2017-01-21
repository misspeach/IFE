/**
 * Created by shizhan on 17/1/20.
 */
var root;
var stack=[];
var array = ['a', 'e', '#', '#', 'b', 'c', '#', '#', 'd', '#', '#'];
var EventUtil = {
    addHandler: function (e, type, handler) {
        if (e.addEventListener) {
            e.addEventListener(type, handler, false);
        } else if (e.attachEvent) {
            e.attachEvent("on" + type, handler);
        } else {
            e["on" + type] = handler;
        }
    }
};
var handler = function (e) {
    switch (e.target.firstChild.nodeValue) {
        case "前序遍历":
            root.preOrder(callBack);
            break;
        case "中序遍历":
            stack=[];
            root.inOrder(callback);
            animator();
            break;
        case "后序遍历":
            stack=[];
            root.postOrder(callback);
            animator();
            break;
    }
};
function Node(data) {
    this.data = data;
    this.div = null;
    this.left = null;
    this.right = null;
}
function animator() {
    var i=0;
    stack[i].style.backgroundColor='pink';
    var timer=setInterval(function () {
        i++;
        if(i<stack.length){
            stack[i-1].style.backgroundColor='white';
            stack[i].style.backgroundColor='pink';
        }else{
            clearInterval(timer);
            stack[i-1].style.backgroundColor='white';
        }
    },1000);
}
function callback(node) {
    stack.push(node.div);
}
function callBack(node) {
    if(node.div!==null){
        node.div.style.backgroundColor='pink';
    }
}
Node.prototype.postOrder = function (callback) {//后序遍历
    (function recurse(currentNode) {
        if (currentNode.data !== '#') {
            recurse(currentNode.left);
            recurse(currentNode.right);
            callback(currentNode);
        }
    })(this);
};
Node.prototype.inOrder = function (callback) {//中序遍历
    (function recurse(currentNode) {
        if (currentNode.data !== '#') {
            recurse(currentNode.left);
            callback(currentNode);
            recurse(currentNode.right);
        }
    })(this);
};
Node.prototype.preOrder = function (callBack) {//前序遍历
    (function recurse(currentNode) {
        callBack(currentNode);
        if (currentNode.data !== '#') {
            setTimeout(function () {
                currentNode.div.style.backgroundColor = 'white';
                recurse(currentNode.left);
                setTimeout(function () {
                    recurse(currentNode.right);
                }, 1000);
            }, 1000);
        }
    })(this);
};

function createNode(newNode) {
    var data = array.shift();
    var node = new Node(data);
    if (data !== '#') {
        var parent = render(newNode);
        node.div = parent;
        node.left = createNode(parent);
        node.right = createNode(parent);
        if (node.left.data === '#' && node.right.data !== '#') {
            parent.style.justifyContent = 'flex-end';
        } else if (node.right.data === '#') {
            parent.style.justifyContent = 'flex-start';
        }
    }
    return node;
}
function render(obj) {
    var newNode = document.createElement('div');
    newNode.className = 'box';
    obj.appendChild(newNode);
    return newNode;
}
function init() {
    var content = document.getElementById('content');
    var item = array.shift();
    root = new Node(item);
    if (item !== '#') {
        var rootNode = document.createElement('div');
        rootNode.className = 'root';
        content.appendChild(rootNode);
        root.div = rootNode;
        root.left = createNode(rootNode);
        root.right = createNode(rootNode);
        if (root.left.data === '#' && root.right.data !== '#') {
            rootNode.style.justifyContent = 'flex-end';
        } else if (root.right.data === '#') {
            rootNode.style.justifyContent = 'flex-start';
        }
    }
    var ops = document.getElementById('ops');
    EventUtil.addHandler(ops, 'click', handler);
}
init();