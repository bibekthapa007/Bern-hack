function updateOrCreate(model, where, newItem) {
  // First try to find the record
  return model.findOne({ where: where }).then(function(foundItem) {
    if (!foundItem) {
      // Item not found, create a new one
      return model.create(newItem).then(function(item) {
        return { item: item, created: true };
      });
    }
    // Found an item, update it
    return model.update(newItem, { where: where }).then(function(item) {
      return { item: item, created: false };
    });
  });
}

module.exports = updateOrCreate;
