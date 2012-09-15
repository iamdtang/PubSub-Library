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

    describe("unsubscribe('test-topic')", function() {
        beforeEach(function() {
            ps = new PS();

            sub1 = ps.subscribe('test-topic', function() {
                // code here
            });

            unsub1 = ps.unsubscribe('test-topic', sub1);
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
            expect(ps.unsubscribe('test-topic', 99)).toBe(false);
        });
    });


    describe("publish('test-topic')", function() {
        beforeEach(function() {
            ps = new PS();

            ps.subscribe('test-topic', function() {
                console.log('some function');
            });

            ps.subscribe('test-topic', function() {
                console.log('some function');
            });

            ps.subscribe('test-topic', function() {
                console.log('some function');
            }, { name: 'David', age: 26});
        });

        it("should invoke the 3 callback functions registered to test-topic", function() {
            var spy1 = spyOn(ps.topicList['test-topic'][1], 'cb');
            var spy2 = spyOn(ps.topicList['test-topic'][2], 'cb');
            var spy3 = spyOn(ps.topicList['test-topic'][3], 'cb');

            ps.publish('test-topic', 'data-here');

            expect(spy1).toHaveBeenCalledWith('data-here');
            expect(spy2).toHaveBeenCalledWith('data-here');
            //expect(spy3).
        });
    });

});