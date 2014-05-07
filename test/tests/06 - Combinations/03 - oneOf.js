describe("Combinators 03", function () {

	it("oneOf success", function () {
		var data = 5;
		var schema = {
			"oneOf": [
				{"type": "integer"},
				{"type": "string"},
				{"type": "string", minLength: 1}
			]
		};
		var valid = tv4.validate(data, schema);
		assert.isTrue(valid);
	});

    it("oneOf success with validateMultiple 1", function () {
        var data = 5;
        var schema = {
            "oneOf": [
                {"type": "integer"},
                {"type": "string"},
                {"type": "string", minLength: 1}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

    it("oneOf success with validateMultiple 2", function () {
        var data = {"type1": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "oneOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

    it("oneOf success with validateMultiple 3", function () {
        var data = {"type1": "string"};
        var schema = {
            properties: {
                "type1": {"type": "string"},
                "type2": {"type": "string"}
            },
            "oneOf": [
                {"required": ["type1"]},
                {"required": ["type2"]}
            ]
        };
        var result = tv4.validateMultiple(data, schema);
        assert.isTrue(result.valid);
    });

	it("oneOf failure (too many)", function () {
		var data = "string";
		var schema = {
			"oneOf": [
				{"type": "integer"},
				{"type": "string"},
				{"minLength": 1}
			]
		};
		var valid = tv4.validate(data, schema);
		assert.isFalse(valid);
	});

	it("oneOf failure (no matches)", function () {
		var data = false;
		var schema = {
			"oneOf": [
				{"type": "integer"},
				{"type": "string"},
				{"type": "string", "minLength": 1}
			]
		};
		var valid = tv4.validate(data, schema);
		assert.isFalse(valid);
	});
});
