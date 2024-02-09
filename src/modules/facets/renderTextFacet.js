import libEvents from "../../../../search-JS-core/src/constants";

export default function(facetItem,selectedFacet = [],isExpanded,facetSearchTxt, onlyValues) {
    try{
        let valuesUI = [];
        const {
            // facetName,
            values = []
        } = facetItem;
        // const {
        //     openFacet,
        //     closeFacet
        // } = this.cssList;
        const self = this;
        const {
            facet
        } = this.options;
        // const {
        //     isCollapsible
        // } = facet;
        let selected = false;
        if (values.length > 0) {
            valuesUI = values.map((value = {}) => {
                const { dataId } = value;
                facetItem.isSelected = selectedFacet.some((facet) => {
                    return facet.dataId === dataId;
                })
                if (facetItem.isSelected) {
                    // if isSelected is set to true once, capture it for setting the final isSelected value
                    selected = facetItem.isSelected
                }
                return self.options.facet.facetItemTemplate.bind(self)(facetItem, value, facetSearchTxt)
            });
        }
        if (onlyValues) {
            return valuesUI.join('');
        }
        facetItem.isSelected = selected;
        const facetUI = this.options.facet.facetTemplate.bind(this)(facetItem, valuesUI.join(''), isExpanded, facetSearchTxt, facet);
        // let styles = (isExpanded) ? openFacet : closeFacet;
        // if (!isCollapsible) {
        //     styles = "";
        // }
        return `${facetUI}`;
    }catch(err){
        this.onError("facets > renderTextFacet.js", err,libEvents.runtimeError);
    }
    
}
