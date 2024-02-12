

const createLayout = function () {
    this.searchResultsWrapper = this.createtSearchWrapper();
    this.bannerWrapper = this.createBannerWrapper();
    this.breadcrumbWrapper = this.createBreadcrumbWrapper();
    this.pageSizeWrapper = [];
    // this.productViewTypeWrapper = this.createProductViewTypeWrapper()
    this.paginationWrappers = [];
    this.facetWrappers = [];
    this.sortWrappers = [];
    this.selectedFacetWrappers = [];
    this.spellCheckWrappers = [];
    // const getPaginationWrapper = () => {
    //     const elem = this.createPaginationWrapper();
    //     this.paginationWrappers.push(elem);
    //     return elem;
    // }
    // const getfacetWrappers = () => { //As how we were doing before.
    //     const elem = this.createFacetWrapper();
    //     this.facetWrappers.push(elem);
    //     return elem;
    // };
    // const getSortElementWrappers = () => { As how we were doing before.
    //     const elem = this.createSortWrapper();
    //     this.sortWrappers.push(elem);
    //     return elem;
    // };
    const getSelectedFacetsWrappers = () => {
        const elem = this.createSelectedFacetWrapper();
        this.selectedFacetWrappers.push(elem);
        return elem;
    };
    const getSpellCheckWrappers = () => {
        const elem = this.createSpellCheckWrapper();
        this.spellCheckWrappers.push(elem);
        return elem;
    };
    const {
        facet,
        breadcrumb,
        banner,
        sort,
        products,
        pagesize,
        pagination,
        productView,
        selectedFacets
    } = this.options;
    const {
        facetsEl
    } = facet;
    const {
        spellCheck
    } = this.options;
    const { el: spellCheckEl } = spellCheck;
    
    const paginationType = this.getPaginationType();

    if (spellCheckEl) {
        let els = spellCheckEl;
        if (!els.length) {
            els = [spellCheckEl];
        }
        els.forEach((el) => {
            el.innerHTML = ``;
            el.appendChild(getSpellCheckWrappers());
        })
    }
    if (facetsEl) {
        let els = facetsEl;
        if (!facetsEl.length) {
            els = [facetsEl];
        }
        els.forEach(facetEl => {
            facetEl.innerHTML = ``;
            this.facetWrappers.push(facetEl);
            // facetEl.appendChild(getfacetWrappers()); As how we were doing before.
        });
    }
    const {
        el: sortEls
    } = sort;
    if (sortEls) {
        let els = sortEls;
        if (!sortEls.length) {
            els = [sortEls];
        }
        els.forEach(sortEl => {
            sortEl.innerHTML = ``;
            if(sort.enabled){
                this.sortWrappers.push(sortEl);
            }
            // sort.enabled && sortEl.appendChild(getSortElementWrappers()); As how we were doing before.
        });
    }
    if (facet.selectedFacetsEl) {
        // console.error(`selectedFacetsEl option is deprecated from v2.0.2, please use selectedFacets option to configure selected facets elements and template`)
        facet.selectedFacetsEl.innerHTML = ``;
        facet.selectedFacetsEl.appendChild(getSelectedFacetsWrappers());
    } else {
        const { el: selectedFacetsElems } = selectedFacets;
        if (selectedFacets.enabled && selectedFacetsElems) {
            let els = selectedFacetsElems;
            if (!selectedFacetsElems.length) {
                els = [selectedFacetsElems];
            }
            els.forEach((el) => {
                el.innerHTML = ``;
                el.appendChild(getSelectedFacetsWrappers());
            })
        }
    }

    if (breadcrumb.el) {
        breadcrumb.el.innerHTML = ``;
        breadcrumb.enabled && breadcrumb.el.appendChild(this.breadcrumbWrapper);
    }
    if (banner.el) {
        banner.el.innerHTML = ``;
        if (banner.enabled) {
            banner.template.bind(this);
            banner.el.appendChild(this.bannerWrapper);
        }
    }

    if(products.el){
        products.el.innerHTML=``;

        if (paginationType === "INFINITE_SCROLL" || paginationType === "CLICK_N_SCROLL"){
            const preLoader = document.createElement('div');
            preLoader.classList.add('UNX-pre-loader');
            preLoader.style.height = this.getHeightDiffToTriggerNextPage() + 'px';
            products.el.appendChild(preLoader);
        }

        products.el.appendChild(this.searchResultsWrapper);

        if (paginationType === "INFINITE_SCROLL" ){
            const postLoader = document.createElement('div');
            postLoader.classList.add('UNX-post-loader');
            postLoader.style.height = this.getHeightDiffToTriggerNextPage() + 'px';
            products.el.appendChild(postLoader);
        }

    }
    
    const {
        el: pagesizeEls 
    } = pagesize;
    
    if(pagesizeEls){
        let els = pagesizeEls;
        if (!pagesizeEls.length) {
            els = [pagesizeEls];
        }
        
        els.forEach((element)=>{
            element.innerHTML = ``;
            if(pagesize.enabled){
                this.pageSizeWrapper.push(element);
            }
        })
    }
    
    if (productView.el) {
        productView.el.innerHTML = ``;
        this.productViewTypeWrapper = productView.el;
        // productView.el.appendChild(this.productViewTypeWrapper)
    }
    const {
        el
    } = pagination;
    if (el) {
        let els = el;
        if (!el.length) {
            els = [el];
        }
        els.forEach(element => {
            element.innerHTML = ``;
            // pagination.enabled && element.appendChild(getPaginationWrapper());
            if(pagination.enabled){
                this.paginationWrappers.push(element);
            }
        });
    }

}
export default createLayout;
