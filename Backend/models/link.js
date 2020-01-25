/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "subject",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      originalLink: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: "link"
    }
  );
};

// INSERT INTO subject SELECT subject_id, subject_name, 'mbbs' FROM mbbs.subject
// INSERT INTO subject SELECT subject_id + 7, subject_name, 'pg' FROM avayas.subject
