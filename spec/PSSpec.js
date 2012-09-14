describe('PS', function() {
    var ps, sub1, unsub1;


    describe('subscriptions', function() {
        beforeEach(function() {
            ps = new PS();

            sub1 = ps.subscribe('test-topic', function() {
                // code here
            });
        });

        describe('topicList', function() {
            it('should have 1 key with 1 subscription function in the cb property', function() {
                expect(typeof ps.topicList['test-topic'][1].cb).toEqual('function');
            });
        });

        describe('subscribe', function() {
            it('should return a subscription identifier string', function() {
                expect(sub1).toBeDefined();
            });
        });
    });

    describe('unsubscriptions', function() {
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

        describe('unsubscribe', function() {
            it('should return true for a successful unsubscription', function() {
                expect(unsub1).toBe(true);
            });

            it('should return false for an unsuccessful unsubscription', function() {
                expect(ps.unsubscribe('test-topic', 99)).toBe(false);
            });
        });
    });


    // describe('publications', function() {
    //     beforeEach(function() {
    //         ps = new PS();
    //     });
    // });

});