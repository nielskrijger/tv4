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

    it("anyOf success with validateMultiple 1", function () {
        var data = 5;
        var schema = {
            "anyOf": [
                {"type": "integer"},
                {"type": "string"},
                {"type": "string", minLength: 1}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

    it("anyOf success with validateMultiple 2", function () {
        var data = {"type1": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "anyOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

    it("anyOf success with validateMultiple 3", function () {
        var data = {"type2": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "anyOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

    it("anyOf success with validateMultiple 4", function () {
        var data = {"linkWith": {"account": "test"}};
        var schema = {
            properties: {
                linkWith: {
                    description: 'Esteblishes a relationship with this transaction and another transaction or account',
                    properties: {
                        nr: {
                            type: 'integer'
                        },
                        account: {
                            type: 'string'
                        },
                        unique: {
                            type: 'boolean'
                        }
                    },
                    anyOf: [
                        { required: ['account'] },
                        { required: ['nr'] }
                    ]
                }
            }
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
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
});
