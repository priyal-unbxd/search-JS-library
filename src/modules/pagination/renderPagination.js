const renderPagination = function () {
    try{
        const {
            pagination = {}
        } = this.options;
        
        const paginationType = this.getPaginationType();
        
        let paginationUI = ``;
        if (paginationType !== 'INFINITE_SCROLL') {
            const pageInfo = this.getPaginationInfo();
            if (pageInfo) {
                paginationUI = pagination.template.bind(this)(pageInfo, pagination);
            }
        }
        return paginationUI;
    }
    catch(err){
        this.onError("Pagination > renderPagination.js",err)
    }

}
export default renderPagination;
