module.exports = class RunQuery {
    constructor(query, parameterDetails) {
        this.query = query;
        this.parameterDetails = parameterDetails
    }

    parameter() {
        return this.parameterDetails;
    }

    get() {
        return this.query;
    }
}