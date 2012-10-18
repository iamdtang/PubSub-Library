describe('PS', function() {
    var ps, sub1, unsub1;

    describe('subscribe()', function() {
        beforeEach(function() {
            ps = new PS();

            sub1 = ps.subscribe('test-topic', function() {
                // code here
            });
        });

        describe('topicList', function() {
            it('should have 1 key with an object value containing the subscription function in the cb property', function() {
                expect(typeof ps.topicList['test-topic'][1].cb).toEqual('function');
            });
        });

        it('should return a subscription identifier string', function() {
            expect(sub1).toBeDefined();
        });
    });

    describe("unsubscribe()", function() {
        beforeEach(function() {
            ps = new PS();

            sub1 = ps.subscribe('test-topic', function() {
                // code here
            });

            unsub1 = ps.unsubscribe(sub1);
        });

        describe('topicList', function() {
            it('should have an undefined cb property', function() {
                expect(ps.topicList['test-topic'][1]).toBeUndefined();
            });
        });

        it('should return true for a successful unsubscription', function() {
            expect(unsub1).toBe(true);
        });

        it('should return false for an unsuccessful unsubscription', function() {
            expect(ps.unsubscribe(99)).toBe(false);
        });
    });

    describe("publish('test-topic')", function() {
        var context1 = { name: 'David', age: 26 };

        beforeEach(function() {
            ps = new PS();

            ps.subscribe('test-topic', function() {
                console.log('some function');
            });

            ps.subscribe('test-topic', function() {
                console.log('some function');
            });
        });

        it("should invoke the 3 callback functions registered to test-topic", function() {
            var spy1 = spyOn(ps.topicList['test-topic'][1], 'cb');
            var spy2 = spyOn(ps.topicList['test-topic'][2], 'cb');

            ps.publish('test-topic', 'data-here');

            expect(spy1).toHaveBeenCalledWith('data-here');
            expect(spy2).toHaveBeenCalledWith('data-here');
        });

        it("should invoke the callback in a particular context if passed as a 3rd argument", function() {
            ps.subscribe('test-topic', function() {
                expect(this).toEqual(context1);
            }, context1);

            ps.publish('test-topic');
        });
    });
});