package com.spa.react.core.models;

import com.spa.react.core.beans.Image;
import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface Featurette {
    public String getComponentId();

    public String getHeader();

    public String getDescription();

    public Boolean getIsDecorative();

    public Image getImage();

    public String getExportedType();

}
