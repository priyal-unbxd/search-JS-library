
import infiniteScroller from '../modules/pagination/infiniteScroller';
import debounce from '../modules/utils/debounce';
function bindEvents(){
    const {
        searchButtonSelector,
        searchTrigger,
        productItemClass,
        facet,
        productView,
        pagination,
        sort,
        pagesize,
        spellCheck
    } = this.options;
    this.options.searchBoxSelector.addEventListener("keydown", (e) => {
        const val = e.target.value;
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            if(val !== ""){
                this.setInputValue.bind(this)();
            }
        }
    });
    if(pagination.enabled) {
        this.paginationWrappers.forEach((wrapper)=>{
            this.delegate(
                wrapper,
                pagination.action,
                `.${pagination.pageClass}`,
                this.paginationAction.bind(this)
            )
            //wrapper.addEventListener(pagination.action, this.paginationAction.bind(this));
        });
    }
    searchButtonSelector.addEventListener(searchTrigger,this.setInputValue.bind(this));
    this.delegate(
        spellCheck.el,
        "click",
        `.${spellCheck.selectorClass}`,
        this.setSuggestion.bind(this)
    );
    //productItemSelector
    this.delegate(
        this.searchResultsWrapper,
        "click",
        '.'+productItemClass,
        this.onProductItemClick.bind(this)
    );
    this.delegate(
        sort.el, 
        sort.action, 
        "."+sort.sortClass,
        this.sortAction.bind(this)
    )
    this.delegate(
        this.facetsWrapper, 
        facet.facetAction, 
        "."+facet.facetClass, 
        this.findChangedFacet.bind(this)
    )
    if(facet.selectedFacetsEl) {
        this.delegate(
            facet.selectedFacetsEl, 
            facet.facetAction, 
            "."+facet.selectedFacetClass, 
            this.findChangedFacet.bind(this)
        )
    }
    if(this.rangeFacetsWrapper) {
        this.delegate(
            this.rangeFacetsWrapper, 
            "click", 
            "button", 
            this.onClickRangeFacet.bind(this)
        )
    }
    if(this.multiLevelFacetWrapper) {
        this.delegate(
            this.multiLevelFacetWrapper, 
            'click', 
            "."+this.options.facet.multiLevelFacetSelector, 
            this.onBucketedFacet.bind(this)
        )
    }
    if(this.breadcrumbWrapper) {
        this.delegate(
            this.breadcrumbWrapper, 
            "click", 
            "."+this.options.breadcrumb.selectorClass, 
            this.onBucketedFacet.bind(this)
        )
    }
    if(productView.el){
        this.delegate(
            productView.el,
            productView.action,
            "."+productView.viewTypeClass,
            this.onPageViewTypeClick.bind(this)
        )
    }
    if(this.options.pagination.type === 'INFINITE_SCROLL') {
        document.addEventListener("scroll", debounce(()=>{
            infiniteScroller.bind(this)();
        },1000));
    }
    this.delegate(
        this.pageSizeWrapper,
        pagesize.action,
        `.${pagesize.pageSizeClass}`,
        this.onClickPageSize.bind(this)
    );
    this.onLocationChange = function (evt){
        const {
            urlState
        } = this.state;
        if(decodeURIComponent(location.hash) !== `#${decodeURIComponent(urlState)}`){
            this.renderFromUrl()
        }
    }
    window.onhashchange= this.onLocationChange.bind(this);
}
export default bindEvents;
