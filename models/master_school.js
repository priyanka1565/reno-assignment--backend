module.exports = function(sequelize,DataTypes){
    return sequelize.define("master_school",{
        id:{
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        address:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        city:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        state:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        contact:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        image:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        email_id:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        is_deleted:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            Comment:"1 for deleted and 0 not deleted"
        },
        school_status:{
            type:DataTypes.INTEGER,
            defaultValue:101,
            Comment:"101 for active and 102 inactive"
        },
        updated_at:{
           type:DataTypes.DATE,
           allowNull:true,
        },
        created_at:{
           type:DataTypes.DATE,
           allowNull:true
        },
        deleted_date:{
            type:DataTypes.DATE,
            allowNull:true
        }
    },
    {
        sequelize,
        tableName: 'master_school',
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
            ]
          }
        ]
      }
)
}