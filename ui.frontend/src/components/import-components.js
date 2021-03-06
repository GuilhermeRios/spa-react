/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
import withAsyncImport from "../utils/withAsyncImport";

import './Page/Page';
import './Container/Container';
import './ExperienceFragment/ExperienceFragment';

import { MapTo } from '@adobe/aem-react-editable-components';

import {
    CarouselV1IsEmptyFn
} from '@adobe/aem-core-components-react-spa/dist/isEmptyFunctions';

import {
    ContainerV1, ContainerV1IsEmptyFn,
    TabsV1, TabsV1IsEmptyFn,
    AccordionV1, AccordionV1IsEmptyFn,
} from '@adobe/aem-core-components-react-spa';


import { Featurette, FeaturetteEditConfig } from "./Featurette/Featurette";
import MarketingCardsContainer from "./MarketingCardsContainer/MarketingCardsContainer";

//lazyload / code splitting example of an internal component
const LazyTextComponent = withAsyncImport(() => import(`./Text/Text`));

//lazyload / code splitting examples of external components
const CarouselV1 = withAsyncImport(() => import(`@adobe/aem-core-components-react-spa/dist/container/carousel/v1/CarouselV1`));

MapTo('spa-react/components/tabs')(TabsV1, { isEmpty: TabsV1IsEmptyFn });
MapTo('spa-react/components/accordion')(AccordionV1, { isEmpty: AccordionV1IsEmptyFn });
MapTo('spa-react/components/carousel')(CarouselV1, { isEmpty: CarouselV1IsEmptyFn });
MapTo('spa-react/components/container')(ContainerV1, { isEmpty: ContainerV1IsEmptyFn });

/** Training */
MapTo('spa-react/components/featurette/v1/featurette')(Featurette, FeaturetteEditConfig);
MapTo('spa-react/components/marketing-cards-container/v1/marketing-cards-container')(MarketingCardsContainer);

//lazy load of internal component (hello world)

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const TextEditConfig = {
    emptyLabel: 'Text',

    isEmpty: function (props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

MapTo('spa-react/components/text')(LazyTextComponent, TextEditConfig);