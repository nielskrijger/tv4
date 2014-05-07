describe("Combinators 01", function () {

    it("allOf success", function () {
        var data = 10;
        var schema = {
            "allOf": [
                {"type": "integer"},
                {"minimum": 5}
            ]
        };
        var valid = tv4.validate(data, schema);
        assert.isTrue(valid);
    });

    it("allOf success with validateMultiple 1", function () {
        var data = {"type1": "string", "type2": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "allOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

    it("allOf failure with validateMultiple 2", function () {
        var data = {"type1": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "allOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isFalse(result.valid);
    });

    it("allOf failure with validateMultiple 3", function () {
        var data = {"type2": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "allOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isFalse(result.valid);
    });

    it("allOf failure", function () {
        var data = 1;
        var schema = {
            "allOf": [
                {"type": "integer"},
                {"minimum": 5}
            ]
        };
        var valid = tv4.validate(data, schema);
        assert.isFalse(valid);
    });
});
