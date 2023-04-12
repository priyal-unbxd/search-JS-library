function renderProductViewTypeUI(){
    try {
        const {
            productView = {}
        } = this.options;
        if (productView.el) {
            const {
                productViewType
            } = this.viewState;
            const results = this.getSearchResults();
            if (results && results.numberOfProducts === 0) {
                this.productViewTypeWrapper.innerHTML = ``;
            } else {
                this.productViewTypeWrapper.innerHTML = this.options.productView.template.bind(this)(productViewType, productView);
            }
        }
        
    }catch{
        this.options.onError("Product view type");
    }

};
export default renderProductViewTypeUI;
