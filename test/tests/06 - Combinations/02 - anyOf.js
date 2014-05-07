describe("Combinators 02", function () {

    it("anyOf success", function () {
        var data = "hello";
        var schema = {
            "anyOf": [
                {"type": "integer"},
                {"type": "string"},
                {"minLength": 1}
            ]
        };
        var valid = tv4.validate(data, schema);
        assert.isTrue(valid);
    });

    it("anyOf success with validateMultiple", function () {
        var data = "hello";
        var schema = {
            "anyOf": [
                {"type": "integer"},
                {"type": "string"},
                {"minLength": 1}
            ]
        };
        var valid = tv4.validateMultiple(data, schema);
        assert.isTrue(valid);
    });

    it("anyOf failure", function () {
        var data = true;
        var schema = {
            "anyOf": [
                {"type": "integer"},
                {"type": "string"}
            ]
        };
        var valid = tv4.validate(data, schema);
        assert.isFalse(valid);
    });

    it("anyOf success with required attributes", function () {
        var data = {"type1": "string"};
        var schema = {
            "properties": {
                "type1": {
                    type: "string"
                },
                "type2": {
                    type: "string"
                }
            },
            "anyOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var valid = tv4.validate(data, schema);
        assert.isTrue(valid);
    });

    it("anyOf success with nested attributes", function () {
        var data = {
            "nested": {
                "type2": "string"
            }
        };
        var schema = {
            "properties": {
                "nested": {
                    "properties": {
                        "type1": {
                            type: "string"
                        },
                        "type2": {
                            type: "string"
                        }
                    },
                    "anyOf": [
                        {"required": ["type1"]},
                        {"required": ["type2"]}
                    ]
                }
            }
        };
        var valid = tv4.validate(data, schema);
        assert.isTrue(valid);
    });
});
