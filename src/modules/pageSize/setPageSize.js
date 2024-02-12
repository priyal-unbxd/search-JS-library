import libEvents from '../../../../search-JS-core/src/constants';
import {
    onClickPageSize
} from './onClickPageSize';
import pageSizeUi from './pageSizeUi';
const renderPageSize = function() {
    try{
        const {
            pagesize = {}
        } = this.options;
        
        const {
            pageSizeWrapper = []
        } = this;
        
        let selected = pagesize.pageSize;
        const qParams = this.getQueryParams() || {};
        if (qParams) {
            selected = this.state.pageSize;
        }
        const results = this.getSearchResults();
        
        pageSizeWrapper && pageSizeWrapper.forEach((wrapper)=>{
            if (results && results.numberOfProducts === 0) {
                wrapper.innerHTML = ``;
            } else {
                wrapper.innerHTML = this.options.pagesize.template.bind(this)(selected, pagesize);
            }
        })
    }
    catch(err){
        this.onError("Pagesize > renderPageSize",err,libEvents.runtimeError)
    }
    
}
/* eslint-disable no-unused-vars */
const setPageSize = (prototype) => {
    prototype = Object.assign(prototype,{
        pageSizeUi,
        onClickPageSize,
        renderPageSize
    })
}
/* eslint-disable no-unused-vars */
export {
    setPageSize as default,
    renderPageSize,
    pageSizeUi,
    onClickPageSize
};
