import libEvents from "../../../../search-JS-core/src/constants";

export default function(rangeFacet={}, isExpanded) {
    try{
        const {
            facetName
        } = rangeFacet;
        // const {
        //     openFacet = "",
        //     closeFacet = ""
        // } = this.cssList;
        const {
            facet = {}
        } = this.options;
        // const {
        //     isCollapsible
        // } = facet;
        const selectedRanges = this.state.rangeFacet;
        const selectedRange = selectedRanges[facetName] || [];
        rangeFacet.isSelected = selectedRange.length > 0;
        const facetUI = this.options.facet.rangeTemplate.bind(this)(rangeFacet, selectedRange, facet);
        const rangeUi = this.options.facet.facetTemplate.bind(this)(rangeFacet, facetUI, isExpanded, null, facet);
        // let styles = (isExpanded) ? openFacet : closeFacet;
        // if (!isCollapsible) {
        //     styles = "";
        // }
        return `${rangeUi}`;
    }catch(err){
        this.onError("facets > renderRangeFacet.js", err,libEvents.runtimeError);
    }
   
}
