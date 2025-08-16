const DomShort = {};

// DOM Manipulation Methods
DomShort.id = document.getElementById.bind(document);
DomShort.tag = document.getElementsByTagName.bind(document);
DomShort.class = document.getElementsByClassName.bind(document);
DomShort.name = document.getElementsByName.bind(document);
DomShort.query = document.querySelector.bind(document);
DomShort.all = document.querySelectorAll.bind(document);
DomShort.create = document.createElement.bind(document);
DomShort.createNS = document.createElementNS.bind(document);
DomShort.fragment = document.createDocumentFragment.bind(document);
DomShort.textNode = document.createTextNode.bind(document);
DomShort.comment = document.createComment.bind(document);
DomShort.elemPoint = document.elementFromPoint.bind(document);
DomShort.elemsPoint = document.elementsFromPoint.bind(document);
DomShort.selection = document.getSelection.bind(document);
DomShort.focus = document.hasFocus.bind(document);

export default DomShort;