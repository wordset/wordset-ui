import DS from "ember-data";

export default DS.ActiveModelSerializer.extend({

  // This is a native function in EmberData. However, for some reason,
  // we can only get it to work if we paste it in our own code
  // https://github.com/emberjs/data/blob/v1.0.0-beta.16.1/packages/ember-data/lib/serializers/json-serializer.js#L613
  // 
  // serializeHasMany(snapshot, json, relationship) {
  //   var key = relationship.key;
  //
  //   if (this._canSerialize(key)) {
  //     var payloadKey;
  //     // if provided, use the mapping provided by `attrs` in
  //     // the serializer
  //     payloadKey = this._getMappedKey(key);
  //     if (payloadKey === key && this.keyForRelationship) {
  //       payloadKey = this.keyForRelationship(key, "hasMany");
  //     }
  //
  //     var relationshipType = snapshot.type.determineRelationshipType(relationship);
  //
  //     if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany') {
  //       json[payloadKey] = snapshot.hasMany(key, { ids: true });
  //       // TODO support for polymorphic manyToNone and manyToMany relationships
  //     }
  //   }
  // },

});
