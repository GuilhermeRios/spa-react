package com.spa.react.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.spa.react.core.beans.Image;
import com.spa.react.core.models.Featurette;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.jetbrains.annotations.NotNull;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = {Featurette.class, ComponentExporter.class},
        resourceType = FeaturetteImpl.RESOURCE_TYPE
)
@Exporter(
        name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class FeaturetteImpl implements Featurette, ComponentExporter {
    protected static final String RESOURCE_TYPE = "spa-react/components/featurette/v1/featurette";

    @Inject
    private Resource resource;

    @Getter
    private Image image;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Getter
    private String componentId;

    /**
     * Text properties
     */
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Getter
    private String header;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Getter
    private String description;

    /**
     * Image properties
     */
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(booleanValues = false)
    protected Boolean isDecorative;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String fileReference;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String alt;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String id;

    @PostConstruct
    protected void init() {
        if (StringUtils.isEmpty(fileReference)) {
            return;
        }
        this.image = new Image();
        this.image.setSrc(fileReference);
        this.image.setId(id);
        if (isDecorative) {
            return;
        }
        this.image.setAltText(alt);
    }

    /**
     * Image Component Getters
     */
    @Override
    public Boolean getIsDecorative() {
        return isDecorative;
    }

    /**
     * ComponentExporter
     */
    @Override
    @NotNull
    public String getExportedType() {
        return FeaturetteImpl.RESOURCE_TYPE;
    }
}
