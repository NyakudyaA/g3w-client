var PickFeatureEventType = {
  PICKED: 'picked'
};

var PickFeatureEvent = function(type, feature, coordinate) {
  ol.events.Event.call(this, type);
  this.feature = feature;
  this.coordinate = coordinate;
};
ol.inherits(PickFeatureEvent, ol.events.Event);

var PickFeatureInteraction = function(options) {
  ol.interaction.Pointer.call(this, {
    handleDownEvent: PickFeatureInteraction.handleDownEvent_,
    handleUpEvent: PickFeatureInteraction.handleUpEvent_,
    handleMoveEvent: PickFeatureInteraction.handleMoveEvent_,
  });
  
  this.layers_ = options.layers;
  this.pickedFeature_ = null;
  
  this.layerFilter_ = function(layer) {
    return ol.array.includes(options.layers, layer);
  };
};
ol.inherits(PickFeatureInteraction, ol.interaction.Pointer);

PickFeatureInteraction.handleDownEvent_ = function(event) {
  this.pickedFeature_ = this.featuresAtPixel_(event.pixel, event.map);
  if (this.pickedFeature_) {
    return true;
  }
  return false;
};

PickFeatureInteraction.handleUpEvent_ = function(event) {
  this.dispatchEvent(
          new PickFeatureEvent(
              PickFeatureEventType.PICKED, this.pickedFeature_,
              event.coordinate));
  return true;
};

PickFeatureInteraction.handleMoveEvent_ = function(event) {
  var elem = event.map.getTargetElement();
  var intersectingFeature = this.featuresAtPixel_(event.pixel, event.map);

  if (intersectingFeature) {
    this.previousCursor_ = elem.style.cursor;

    elem.style.cursor =  'pointer';

  } else {
    elem.style.cursor = this.previousCursor_ !== undefined ?
        this.previousCursor_ : '';
    this.previousCursor_ = undefined;
  }
};

PickFeatureInteraction.prototype.featuresAtPixel_ = function(pixel, map) {
  var found = null;

  var intersectingFeature = map.forEachFeatureAtPixel(pixel,
      function(feature) {
        return feature;
      },this,this.layerFilter_);
  
  if(intersectingFeature){
    found = intersectingFeature;
  }
  return found;
};

module.exports = PickFeatureInteraction;
