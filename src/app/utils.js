const createFragFromText = (text) =>
    document.createRange().createContextualFragment(text);

const idxToDrawParams = (idx, img, numRows = 8, numCols = 9) => {
    const width = img.width / numCols;
    const height = img.height / numRows;
    const col = idx % numCols;
    const row = (idx - col) / numCols;
    return {
        sx: col * width,
        sy: row * height,
        sWidth: width,
        sHeight: height,
    };
};

const SequenceStore = (function() {
    const store = new Map();

    function get(url) {
        let res = null;
        if (!store.has(url)) {
            res = set(url);
        } else {
            res = Promise.resolve(store.get(url));
        }
        return res;
    }

    function set(url) {
        return new Promise((res, rej) => {
            const image = new Image();
            image.src = url;
            image.onload = function() {
                store.set(url, image);
                res(image);
            };
        });
    }

    return {
        get,
        set,
    };
})();

Object.freeze(SequenceStore);

export { createFragFromText, idxToDrawParams, SequenceStore };
