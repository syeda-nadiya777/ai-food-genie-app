class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        return this;
    }

    sort() {
        return this;
    }
}

module.exports = APIFeatures;