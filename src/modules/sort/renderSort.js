function renderSort(){
    try{
        const results = this.getSearchResults();
        const {
            sort = {}
        } = this.options;
        const {
            sortWrappers = []
        } = this;
        sortWrappers.forEach(wrapper => {
            let ui = ``;
            if (results && results.numberOfProducts > 0) {
                ui = this.options.sort.template.bind(this)(this.getSelectedSort(), sort);
            }
            wrapper.innerHTML = ui;
        });
    }
    catch(err){
        this.options.onError("Sort",err);
        throw err;
    }

}
export default renderSort;
