/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "data",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ip: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      source: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      hash: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      platform: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      linkId: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      os: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      device: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      browserName: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cookieId: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ent_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },

    {
      tableName: "data"
    }
  );
};

// INSERT INTO discussion ( discussion_id, module_id, title, subject_id, question, vote, answer, `view`, user_id, ent_date ) SELECT discussion_id, 'pg', title, subject_id, question, vote, answer, `view`, user_id, ent_date FROM avayas.discussion
