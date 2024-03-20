import React, { useEffect, useState } from "react";
import Button from "../../../../Button";
import FiltersModal from "./FiltersModal";
import filtersConfig from "./filter-configs";
import useHashParams from "../../../../../helpers/hooks/use-hash-params";

const FilterAction = ({ onUpdate }) => {
    const [showModal, setShowModal] = useState(false);
    const [hashParams, updateHashParams] = useHashParams();
    const [selectedFilters, setSelectedFilters] = useState(hashParams.filters || []);

    useEffect(() => {
        const mods = filtersConfig
            .map((filterConfig) =>
                filterConfig.options
                    .filter((filterOption) => selectedFilters.includes(filterOption.id))
                    .map((filterOption) => filterOption.criteria)
            )
            .filter((modArr) => modArr.length > 0);
        setSelectedFilters(selectedFilters);
        updateHashParams({ ...hashParams, filters: selectedFilters })
        onUpdate(mods);
    }, [selectedFilters])

    const numSelectedFilters = selectedFilters.length;

    return (
        <>
            <Button className="dashboard__filter-action" onClick={() => setShowModal(true)}>
                <i className="fas fa-filter" />
                {numSelectedFilters === 0 ? "Filter" : `(${numSelectedFilters})`}
            </Button>
            {showModal && (
                <FiltersModal
                    onClose={() => setShowModal(false)}
                    onApply={setSelectedFilters}
                    initialSelections={selectedFilters}
                />
            )}
        </>
    );
};

export default FilterAction;
